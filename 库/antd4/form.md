### 1. 表单项 A 改变，导致 组件B(含表单B) 改变
[demo codesandbox](https://codesandbox.io/s/jibenshiyong-antd494-forked-49fbh?file=/index.js)

```
<!-- 需求：更改组件 表单项name（简称组件 A），对表单项 password（简称组件 B） 进行渲染 -->
<!-- 父组件： -->
const Demo = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <Form form={form} {...layout} name="basic" onFinish={onFinish}>
      <Form.Item label="Username" name="username">
        <Input
          onChange={(e) => {
            form.setFieldsValue({ password: "rujunqiao" });
          }}
        />
      </Form.Item>
      <Test form={form} />
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

<!-- 子组件 -->
const Test = ({ form }) => {
  console.log("执行了吗", form);
  const basic = form?.getFieldValue("basic");
  return (
    <div>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}
      >
        <Input />
      </Form.Item>
      {basic && <div>单纯为了测试展示不展示</div>}
    </div>
  );
};
```
通过执行“setFieldsValue”，修改“Password”的值，我们发现“Test”组件并未刷新，password 表单项的值改变了~
这是因为，Form 通过增量更新方式，只更新被修改的字段相关组件以达到性能优化目的

那么如何实现我们的需求呢？
思路一：
组件B 设置 key？
问题：当 key 改变时，组件B，会重新 渲染（即：执行componentDidMount）, 在业务逻辑复杂的表单（class组件）中，可能会导致问题

思路二：
组件B 设置 trigger

思路三：
增加 shouldUpdate


