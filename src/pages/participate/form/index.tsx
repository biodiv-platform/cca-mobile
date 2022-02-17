import ParticipateFormComponent from "@components/pages/participate/form";
import { IDB_TABLES } from "@static/indexeddb";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useIndexedDBStore } from "use-indexeddb";

export default function ParticipateFormPage() {
  const params: any = useParams();
  const [template, setTemplate] = useState<any>();
  const _templates = useIndexedDBStore(IDB_TABLES.TEMPLATES);

  useEffect(() => {
    _templates.getByID(params.shortName).then((t) => setTemplate(t));
  }, [params]);

  return template ? <ParticipateFormComponent template={template} /> : null;
}
