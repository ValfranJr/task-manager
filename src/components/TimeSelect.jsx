import InputErrorMessage from "./InputErrorMessage";
import InputLabel from "./InputLabel";

const TimeSelect = (props) => {
  return (
    <div>
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        className="outline-brand-primary placeholder:text-brand-text-gray border-brand-light-gray mt-1 w-full rounded-lg border-1 px-4 py-3 placeholder:text-sm"
        name="time"
        id="time"
        value={props.defaultValue}
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="night">Noite</option>
      </select>
      {props.errorMessage && (
        <InputErrorMessage>{props.errorMessage}</InputErrorMessage>
      )}
    </div>
  );
};

export default TimeSelect;
