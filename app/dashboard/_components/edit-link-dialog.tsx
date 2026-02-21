"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLink } from "../actions";
import type { Link } from "@/db/schema";

interface EditLinkDialogProps {
  link: Link;
  children?: React.ReactNode;
}

export function EditLinkDialog({ link, children }: EditLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    originalUrl: link.originalUrl,
    title: link.title || "",
  });

  // Reset form when dialog opens/closes or link changes
  useEffect(() => {
    setFormData({
      originalUrl: link.originalUrl,
      title: link.title || "",
    });
    setError(null);
  }, [link, open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = {
      linkId: link.id,
      originalUrl: formData.originalUrl,
      title: formData.title || undefined,
    };

    const result = await updateLink(data);

    if ("error" in result) {
      setError(result.details || result.error || "An error occurred");
      setIsLoading(false);
    } else {
      // Success - close dialog
      setIsLoading(false);
      setOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Update the destination URL or title for your short link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="shortCode">Short Code (cannot be changed)</Label>
            <Input
              id="shortCode"
              type="text"
              value={link.shortCode}
              disabled
              className="bg-muted"
            />
            <p className="text-sm text-muted-foreground">
              The short code cannot be modified after creation
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="originalUrl">
              Destination URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="originalUrl"
              name="originalUrl"
              type="url"
              placeholder="https://example.com/your-long-url"
              value={formData.originalUrl}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              The URL you want to redirect to
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title (optional)</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="My awesome link"
              value={formData.title}
              onChange={handleInputChange}
              disabled={isLoading}
              maxLength={200}
            />
            <p className="text-sm text-muted-foreground">
              A friendly name for your link
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Link"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
