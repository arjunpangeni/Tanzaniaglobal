import { redirect } from "next/navigation";
import { saveUniversity } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CloudinaryField } from "./cloudinary-field";
import type { UniversityRecord } from "@/lib/data";

export function UniversityForm({ university }: { university?: UniversityRecord }) {
  return (
    <form
      className="grid max-w-2xl gap-4"
      action={async (fd) => {
        "use server";
        await saveUniversity(fd);
        redirect("/admin/universities");
      }}
    >
      <input type="hidden" name="id" defaultValue={university?._id} />
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required defaultValue={university?.name} className="h-10" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required defaultValue={university?.slug} className="h-10" />
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" required defaultValue={university?.country} className="h-10" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="countrySlug">Country slug</Label>
          <Input id="countrySlug" name="countrySlug" required defaultValue={university?.countrySlug} className="h-10" />
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={university?.city} className="h-10" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="ranking">Ranking</Label>
          <Input id="ranking" name="ranking" type="number" defaultValue={university?.ranking} className="h-10" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="rankingTier">Tier</Label>
          <Input id="rankingTier" name="rankingTier" defaultValue={university?.rankingTier} className="h-10" />
        </div>
      </div>
      <CloudinaryField name="logoUrl" label="Logo URL" defaultValue={university?.logoUrl} />
      <CloudinaryField name="coverUrl" label="Cover URL" defaultValue={university?.coverUrl} />
      <div className="grid gap-2">
        <Label htmlFor="overview">Overview</Label>
        <Textarea id="overview" name="overview" rows={5} defaultValue={university?.overview} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="tuitionMin">Tuition min (USD)</Label>
          <Input id="tuitionMin" name="tuitionMin" type="number" defaultValue={university?.tuitionMin} className="h-10" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tuitionMax">Tuition max (USD)</Label>
          <Input id="tuitionMax" name="tuitionMax" type="number" defaultValue={university?.tuitionMax} className="h-10" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="programs">Programmes (comma)</Label>
        <Input id="programs" name="programs" defaultValue={university?.programs.join(", ")} className="h-10" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="fields">Fields (comma)</Label>
        <Input id="fields" name="fields" defaultValue={university?.fields.join(", ")} className="h-10" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea id="requirements" name="requirements" defaultValue={university?.requirements} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="scholarships">Scholarships (comma)</Label>
        <Input id="scholarships" name="scholarships" defaultValue={university?.scholarships.join(", ")} className="h-10" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={university?.published !== false} />
        Published
      </label>
      <Button type="submit" className="rounded-full">
        Save
      </Button>
    </form>
  );
}
