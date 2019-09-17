# with-info-doc-expo-storybook

# Disclaimer 
Feel free to improve anything in this code, it's been done in few hours.
All of this is just a way to wait for a real addon.

# What is it 

It's an alternative to storybook-addon-info but for react native.
You'll find a component you can wrap around the components of your stories to get documentation.

It includes : 
- A component preview
- A table of the component's props
- A clickable source code ( it will be copied to clipboard)

![Alt text](screen2.png?raw=true "Storybook expo menu")
![Alt text](screen1.png?raw=true "WithDocInfo component")


# Getting started 
- In your react native project :
 ```npm install to-json-schema react-syntax-highlighter react-native-table-component jsx-to-string```
- Add with-info-doc/ to storybook/
- Create your .stories in storybook/stories/
- Wrap ```<WithInfoDoc/>``` around your component
- Export your stories in storybook/stories/index.tsx ( I have to export them manually because storybook does not find my  .stories with expo)

# Add more info to the Props table

You can add manually add a description and if the props is required or not.
( see [this example](#https://github.com/RobinLebhar/with-info-doc-expo-storybook/blob/master/example-with-extra-info.stories.tsx) )
Or just a simple example [here](#https://github.com/RobinLebhar/with-info-doc-expo-storybook/blob/master/example.stories.tsx)

( I couldn't find a way to get the description and if the field is required so I have to use an external library 

example to add description and props required or not (these 2 are optionals)

```
import React from "react";
import { storiesOf } from "@storybook/react-native";
import WithInfoDoc, { IPropsDoc } from '../with-info-doc/index';
import SimpleFakeButton from "../../src/components/simple-fake-button";

export default storiesOf("Button", module).add("Simple fake button", () => {
  const propsDoc: IPropsDoc = {
    props1: { description: " this is the description for the props1", isRequired: true },
    props2: { description: " This is a description for the props2" },
    props4: { isRequired: true },
  }
  return (
    <WithInfoDoc propsDoc={propsDoc} >
      <SimpleFakeButton
        props1="Hello"
        props2={298} props3={true}
        props4={{
          innerProps: "Hello",
          deeper: {
            again: {
              ohMyGod: true,
              itsDeep: ["wao", "crazy"]
            }
          }
        }}
        props5={[1, 3, 4]} />
    </WithInfoDoc>
  )
});
  ```
  
 # The props types column
  
  
You'll notice that if the props is made of nested attribute, you'll not get a "pretty type"  but a description of the type so it's more verbose :/ I did not have the time to recontruct the json to get "pretty types" descriptions

  
 Not perfect at all you know it's better than nothing. 
  

