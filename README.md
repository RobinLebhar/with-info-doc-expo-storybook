# with-info-doc-expo-storybook

# What is it 

It's an alternative to storybook-addon-info but for react native.
You'll find a component you can wrap around the components of your stories to get documentation.

It includes : 
- A component preview
- A table of the component's props
- A clickable source code ( it will be copied to clipboard)


# Getting started 
- In your react native project :
 ```npm install to-json-schema react-syntax-highlighter react-native-table-component jsx-to-string```
- Add with-info-doc/ to storybook/
- Create your .stories in storybook/stories/
- Wrap ```<WithInfoDoc/>``` around your component
- Export your stories in storybook/stories/index.tsx ( I have to export them manually because storybook does not find my  .stories with expo)

# Add more info to the Props table

You can add manually add a description and if the props are required or not.
( see [this example](#https://github.com/RobinLebhar/with-info-doc-expo-storybook/blob/master/example-with-extra-info.stories.tsx) )
Or just a simple example [here](#https://github.com/RobinLebhar/with-info-doc-expo-storybook/blob/master/example.stories.tsx)


Note about the props types : When the props is made of nested attribute, you'll see that's it's actually metadata type that are written in the table, ( I couldn't find a way to get the description and if the field is required so I have to use an external library 

