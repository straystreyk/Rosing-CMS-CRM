import { ReferenceArrayField as ReferenceArrayFieldOrigin } from "react-admin";
import React, { ReactNode } from "react";

export const ReferenceArrayField = ReferenceArrayFieldOrigin as React.ComponentType<
  Omit<React.ComponentProps<typeof ReferenceArrayFieldOrigin>, "emptyText"> & {
    emptyText?: ReactNode;
    offsort?: boolean;
  }
>;
