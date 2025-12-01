import { useState } from "react";
import { trpc } from "../lib/trpc";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Loader2, Users, Ban, CheckCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminUsers() {

  const { data: users, isLoading, refetch } = trpc.admin.users.list.useQuery({});

  const suspendMutation = trpc.admin.users.suspend.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
      setSelectedUserId(null);
      setActionType(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const unsuspendMutation = trpc.admin.users.unsuspend.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
      setSelectedUserId(null);
      setActionType(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = trpc.admin.users.delete.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
      setSelectedUserId(null);
      setActionType(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });



  const getStatusBadge = (status: string, isSuspended: boolean) => {
    if (status === "deleted") {
      return <Badge variant="destructive">Dihapus</Badge>;
    }
    if (status === "suspended" || isSuspended) {
      return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Suspended</Badge>;
    }
    return <Badge variant="default" className="bg-green-100 text-green-800">Aktif</Badge>;
  };

  const getRoleBadge = (role: string) => {
    if (role === "admin") {
      return <Badge variant="default" className="bg-blue-100 text-blue-800">Admin</Badge>;
    }
    return <Badge variant="outline">User</Badge>;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-emerald-50/20 to-white">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 px-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Manajemen User</h2>
                <p className="text-muted-foreground mt-1">
                  Kelola user, suspend, atau hapus akun
                </p>
              </div>
            </div>

            {/* Users List */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : users && users.length > 0 ? (
              <div className="grid gap-4 px-4">
                {users.map((user) => (
                  <Card key={user.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl">{user.name || "Tanpa Nama"}</CardTitle>
                            {getRoleBadge(user.role)}
                            {getStatusBadge(user.status, user.isSuspended)}
                          </div>
                          <CardDescription className="flex flex-col gap-1">
                            <span className="flex items-center gap-1">
                              📧 {user.email || "Tidak ada email"}
                            </span>
                            <span className="text-xs">
                              Bergabung: {new Date(user.createdAt).toLocaleDateString("id-ID")}
                            </span>
                          </CardDescription>
                        </div>

                        {/* Actions */}
                        {user.role !== "admin" && user.status !== "deleted" && (
                          <div className="flex gap-2">
                            {user.status === "suspended" || user.isSuspended ? (
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => unsuspendMutation.mutate({ userId: user.id })}
                                className="gap-1 bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Aktifkan
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => suspendMutation.mutate({ userId: user.id })}
                                className="gap-1 bg-orange-600 hover:bg-orange-700"
                              >
                                <Ban className="w-4 h-4" />
                                Suspend
                              </Button>
                            )}

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteMutation.mutate({ userId: user.id, permanent: false })}
                              className="gap-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              Hapus
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Belum ada user</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>


    </div>
  );
}
