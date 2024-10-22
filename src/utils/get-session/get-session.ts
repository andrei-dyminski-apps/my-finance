import { findStorageItemByRegExp } from "@/utils/get-storage-item-by-regexp";

export const getSession = (): string | null => findStorageItemByRegExp(/sb-[a-z0-9]+-auth-token/);
