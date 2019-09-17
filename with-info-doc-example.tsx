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
        props4={{ innerProps: "Hello", deeper: { again: { ohMyGod: true, itsDeep: ["wao", "crazy"] } } }}
        props5={[1, 3, 4]} />
    </WithInfoDoc>
  )
}
