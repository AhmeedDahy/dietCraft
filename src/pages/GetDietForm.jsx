import useUser from "../features/auth/useUser";
import usePlan from "../features/DietRecommendation/usePlan";
import DietDataForm from "../features/DietRecommendation/DietDataForm";
import Spinner from "../ui/Spinner";

function GetDietForm() {
  const { user, isPending: isUserLoading, isAuthenticated } = useUser();
  const { plan, isPending: isPlanLoading } = usePlan(user?.email);
  console.log(user);
  // Wait until user data is fully fetched
  if (isUserLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen image-login">
        <Spinner />
      </div>
    );
  }

  // Only check authentication after loading finishes
  if (!isAuthenticated) {
    return <p>Please log in to access your diet plan.</p>;
  }

  // Wait until plan data is fully fetched
  if (isPlanLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen image-login">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen image-login">
      {plan.length !== 0 ? (
        <p className="p-5 text-gray-700 bg-white rounded-lg">
          You already have a diet plan. You can view or update it.
        </p>
      ) : (
        <DietDataForm />
      )}
    </div>
  );
}

export default GetDietForm;
