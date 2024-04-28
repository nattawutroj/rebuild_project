import { useCallReportContext } from "@/contexts/CallReportContext";
import { Button } from "../ui/button";

const Footer: React.FC = () => {
  const {
    handleClearAll: onClear,
    isSubmitting,
    isValid,
  } = useCallReportContext();
  return (
    <div className="mt-4 flex items-center justify-end gap-5">
      <Button
        variant={"link"}
        type="button"
        className="px-16 py-4 text-slate-900 hover:no-underline"
        onClick={onClear}
      >
        Clear All
      </Button>
      <Button
        variant={"default"}
        type="submit"
        disabled={!isValid || isSubmitting}
        className="rounded-md bg-sky-600 px-16 py-4 text-white"
      >
        Submit
      </Button>
    </div>
  );
};

export default Footer;
