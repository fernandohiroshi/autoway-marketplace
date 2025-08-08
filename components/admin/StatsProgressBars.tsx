"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Image as ImageIcon } from "lucide-react";

interface StatsProgressBarsProps {
  totalUsers: number;
  totalPhotos: number;
  userLimit?: number;
  photoLimit?: number;
}

export function StatsProgressBars({
  totalUsers,
  totalPhotos,
  userLimit = 100,
  photoLimit = 1000,
}: StatsProgressBarsProps) {
  const userPercent = Math.min((totalUsers / userLimit) * 100, 100);
  const photoPercent = Math.min((totalPhotos / photoLimit) * 100, 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Usuários ({totalUsers} / {userLimit})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-gray-600">
              {userPercent.toFixed(0)}% do limite
            </span>
          </div>
          <Progress value={userPercent} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Fotos ({totalPhotos} / {photoLimit})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-2">
            <ImageIcon className="h-6 w-6 text-sky-500 dark:text-sky-300" />
            <span className="text-sm text-gray-600">
              {photoPercent.toFixed(0)}% do limite
            </span>
          </div>
          <Progress value={photoPercent} />
        </CardContent>
      </Card>
    </div>
  );
}
