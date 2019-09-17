import React from "react";
import { Text } from "react-native"
import { storiesOf } from "@storybook/react-native";
import WithInfoDoc from '../with-info-doc/index';

export default storiesOf("Text", module).add("Simple fake text", () => {
  return (
    <WithInfoDoc>
      <Text>It kind of works</Text>
    </WithInfoDoc>
  )
});
