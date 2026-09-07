"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function CloudinaryField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const enabled = Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} value={url} onChange={(e) => setUrl(e.target.value)} />
      {enabled ? (
        <CldUploadWidget
          signatureEndpoint="/api/cloudinary/sign"
          onSuccess={(result) => {
            const info = result.info;
            if (typeof info === "object" && info && "secure_url" in info) {
              setUrl(String(info.secure_url));
            }
          }}
        >
          {({ open }) => (
            <Button type="button" variant="outline" onClick={() => open()}>
              Upload to Cloudinary
            </Button>
          )}
        </CldUploadWidget>
      ) : (
        <p className="text-xs text-muted-foreground">
          Paste a URL, or set Cloudinary env vars to enable direct upload.
        </p>
      )}
    </div>
  );
}
