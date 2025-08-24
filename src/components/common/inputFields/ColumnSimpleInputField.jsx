import { Col } from 'reactstrap';
import InputField from './InputField';

const ColumnSimpleInputField = ({ nameList }) => {
  return (
    <>
      {nameList.map(({ name, ...rest }, i) => (
        <Col lg="4" md="6" sm="12" key={i}>
          <InputField name={name} {...rest} />
        </Col>
      ))}
    </>
  );
};

export default ColumnSimpleInputField;
