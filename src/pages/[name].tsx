import { useRouter } from "next/router";
import TimeLine from "../components/TimeLine";
export default function UserPage() {
  const router = useRouter();

  const name = router.query.name as string;
  return (
    <div>
      <TimeLine
        where={{
          author: {
            name,
          },
        }}
      />
    </div>
  );
}