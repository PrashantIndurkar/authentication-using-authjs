import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      settings page: {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant="destructive" size="sm" type="submit">
          Sign out
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;
