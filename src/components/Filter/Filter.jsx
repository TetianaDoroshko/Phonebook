import { Input, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'redux/contactsSlice';
import { useGetContactsQuery } from 'redux/contactsSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  const { data: contacts } = useGetContactsQuery();

  const filter = useSelector(state => state.filter);

  return (
    contacts && (
      <Form layout="vertical" autoComplete="off">
        <Form.Item label="Find contacts by name" name="filter">
          <Input
            type="text"
            name="filter"
            value={filter}
            onChange={e => dispatch(changeFilter(e.target.value))}
          />
        </Form.Item>
      </Form>
    )
  );
};
