import { Select } from "antd";
interface prop {
  options: any[];
  field?: any;
  placeHolder?: string;
  disable?: boolean
  handleChangeValue?: (message: string) => void
}

const SearchSelect = ({ field, options, placeHolder, disable, handleChangeValue }: prop) => {
  return (
    <Select
      disabled={disable}
      {...field}
      className="w-full"
      showSearch
      placeholder={placeHolder || ""}
      optionFilterProp="label"
      options={options}
      value={field.value || null}
      onChange={(value) => {
        !!handleChangeValue &&
          handleChangeValue(value)
        return field.onChange(value)
      }}
    />
  );
};
export default SearchSelect;
