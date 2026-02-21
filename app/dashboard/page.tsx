import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserLinks } from "@/data/links";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateLinkDialog } from "./_components/create-link-dialog";
import { EditLinkDialog } from "./_components/edit-link-dialog";
import { DeleteConfirmDialog } from "./_components/delete-confirm-dialog";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const links = await getUserLinks(userId);

  return (
    <div className="pt-32">
      <main className="container mx-auto p-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Links</h1>
            <p className="text-muted-foreground mt-2">
              Manage your shortened links
            </p>
          </div>
          <CreateLinkDialog>
            <Button>Create New Link</Button>
          </CreateLinkDialog>
        </div>

        {links.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                You haven't created any links yet
              </p>
              <CreateLinkDialog>
                <Button>Create Your First Link</Button>
              </CreateLinkDialog>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {links.map((link) => (
              <Card key={link.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl mb-2 break-all">
                        {link.title || link.shortCode}
                      </CardTitle>
                      <CardDescription className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-primary">
                            Short URL:
                          </span>
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {process.env.NEXT_PUBLIC_APP_URL ||
                              "localhost:3000"}
                            /{link.shortCode}
                          </code>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-medium text-muted-foreground shrink-0">
                            Destination:
                          </span>
                          <span className="text-sm break-all">
                            {link.originalUrl}
                          </span>
                        </div>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <EditLinkDialog link={link}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </EditLinkDialog>
                      <DeleteConfirmDialog link={link}>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </DeleteConfirmDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Created:</span>
                      <span>
                        {new Date(link.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
