import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import { GoogleIcon } from "@/components/svgs";
export function GoogleSignin() {
  return (
    <Button
      variant="secondary"
      size="lg"
      className="w-full text-gray-500 cursor-pointer"
    >
      <GoogleIcon />
      <Typography tag="span" variant="text-md" color="inherit" fontWeight="medium" >
        Google
      </Typography>
    </Button> 
  );
}
         