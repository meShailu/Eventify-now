import Link from "next/link";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Image,
  Divider,
  Button,
} from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function EventCard({
  title,
  starts_at,
  address,
  eventid,
  tags,
  image,
  children,
}) {
  const router = useRouter();
  const dateTime = new Date(starts_at);
  // Get Date components
  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // Add zero-padding
  const day = dateTime.getDate().toString().padStart(2, "0"); // Add zero-padding

  // Get Time components
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes().toString().padStart(2, "0"); // Add zero-padding
  function handleUrl() {
    router.push(`/events/${eventid}`);
  }
  // console.log("Map URL:", mapURL);
  return (
    // <Link href={`/events/${eventid}`}>
    <Card onPress={handleUrl} isPressable isHoverable className="p-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center gap-3">
        <h3 className="font-bold text-large">{title}</h3>
        <p className="text-tiny uppercase font-bold">{address}</p>
        <small className="text-default-500">{`Date: ${year}-${month}-${day}`}</small>
        <small className="text-default-500">{`Time: ${hours}:${minutes}`}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2  items-center">
        <Image className="object-cover rounded-xl" src={image} alt={title} />
      </CardBody>

      <CardFooter className="pb-0 pt-2 px-4 flex items-center gap-1 justify-between	">
        <div className="flex gap-1">
          {tags.map((tag) => (
            <Chip key={tag} size="lg">
              {tag}
            </Chip>
          ))}
        </div>
        {children}
      </CardFooter>
    </Card>
    // </Link>
  );
}
