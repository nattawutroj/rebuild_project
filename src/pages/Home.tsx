import { useAuth } from "@/hooks";

const HomeComponent: React.FC = () => {
  const auth = useAuth();
  return (
    <div className="p-2">
      <h3>Welcome Home! {auth.user?.accountNo}</h3>
    </div>
  );
};

export default HomeComponent;
