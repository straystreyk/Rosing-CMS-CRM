import { ReferenceField as ReferenceFieldOrigin } from "react-admin";
import React, { ReactNode } from "react";

export const ReferenceField = ReferenceFieldOrigin as React.ComponentType<
  Omit<React.ComponentProps<typeof ReferenceFieldOrigin>, "emptyText"> & { emptyText?: ReactNode }
>;
