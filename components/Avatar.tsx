import Image from "next/image";

type AvatarProps = {
  image: string;
  name: string;
  role: string | undefined;
};

const Avatar = ({ image, name, role }: AvatarProps): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex md:h-24 md:w-24 h-16 w-16 relative">
        <Image
          src={image}
          fill={true}
          className="rounded-full object-cover"
          alt="farmersimage"
        />
      </div>
      <div className="text-gray-400 text-lg pt-2 pb-1">{name}</div>
      <div className="font-playFair text-gray-400 text-xs">{role}</div>
    </div>
  );
};
export default Avatar;
