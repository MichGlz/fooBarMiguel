import { useState, useRef } from "react";
import "./Checkout.scss";
import { Form, Input, Button } from "antd";
import MaskedInput from "antd-mask-input";

export default function Checkout(props) {
  const form = useRef(null);
  const [name, setName] = useState("");
  const [cardnumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCVV] = useState("");

  function postOrder() {
    fetch("https://los-amigos.herokuapp.com/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.payload),
    })
      .then((response) => {
        const obj = response.json();
        return obj;
      })
      .then((data) => {
        props.addID({ id: data.id, customer: props.customerName });
        props.resetBasket();
        props.setIsModalYourID(true);
        props.setShowResults(false);
      })

      .catch((err) => {
        console.error(err);
      });
  }

  const onFinish = (values) => {
    postOrder();
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="FormWrapper">
      <h3>Payment details</h3>

      <Form ref={form} className="Form" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item
          hasFeedback
          className="inputs fullBleed"
          label="Name"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
            props.setCustomerName(() => {
              return e.target.value.split(" ")[0];
            });
          }}
          value={name}
          rules={[
            {
              required: true,
              message: "How should we call you?",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Card number"
          name="cardnumber"
          className="inputs fullBleed"
          rules={[
            {
              pattern: "[0-9 ]{19}",
              required: true,
              message: "We really need you to pay!",
            },
          ]}
        >
          <MaskedInput inputMode="numeric" mask="1111 1111 1111 1111" name="card" size="19" onChange={(e) => setCardNumber(e.target.value)} value={cardnumber} />
        </Form.Item>

        <Form.Item
          hasFeedback
          className="inputs expiry"
          label="Exp"
          name="expiry"
          rules={[
            {
              pattern: "[0-9/]{5}",
              required: true,
              message: "Enter Exp",
            },
          ]}
        >
          <MaskedInput inputMode="numeric" mask="11/11" name="expiry" size="5" placeholder="mm/yy" style={{ width: "100px" }} onChange={(e) => setExp(e.target.value)} value={exp} />
        </Form.Item>

        <Form.Item
          hasFeedback
          className="inputs right"
          label="CVV"
          name="cvv"
          rules={[
            {
              pattern: "[0-9]{3}",
              required: true,
              message: "Enter CVV",
            },
          ]}
        >
          <MaskedInput inputMode="numeric" mask="111" name="ccv" size="3" style={{ width: "70px" }} onChange={(e) => setCVV(e.target.value)} value={cvv} />
        </Form.Item>

        <Form.Item
          className="btn-center"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="isValid" type="primary" htmlType="submit">
            Pay
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
