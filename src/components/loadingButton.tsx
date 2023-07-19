import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

const LoadingButton = ({ loading, label, severity, form }: any) => {
  return (
    <Button
      type="submit"
      form={form ? form : null}
      className={severity ? severity : "primary"}
    >
      {loading ? (
        <ProgressSpinner style={{ width: "25px", height: "25px" }} />
      ) : (
        label
      )}
    </Button>
  );
};

export default LoadingButton;
