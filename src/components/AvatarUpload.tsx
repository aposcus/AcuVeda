
import React, { useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface AvatarUploadProps {
  src: string | null | undefined;
  name: string | null | undefined;
  loading?: boolean;
  onChange: (file: File) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ src, name, loading, onChange }) => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInput.current) fileInput.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  // Fallback: use initials from name
  const fallback = name ? name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "AV";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <Avatar className="h-20 w-20">
          {src ? (
            <AvatarImage src={src} alt="Avatar" />
          ) : (
            <AvatarFallback>{fallback}</AvatarFallback>
          )}
        </Avatar>
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="absolute bottom-0 right-0 rounded-full border border-white bg-white shadow"
          onClick={handleClick}
          disabled={loading}
          aria-label="Upload avatar"
        >
          <Camera size={18} />
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default AvatarUpload;
