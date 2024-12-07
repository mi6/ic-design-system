import React, { useMemo } from "react";
import startCase from "lodash.startcase";
import AttributeCards from "../AttributeCards";
import AttributeTable from "../AttributeTable";
import AttributeName from "../ComponentDetails/AttributeName";

const MigrationPropTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: "V2 name of prop / attribute",
        accessor: "v2Prop",
      },
      {
        Header: "V3 name of prop / attribute",
        accessor: "v3Prop",
      },
      {
        Header: "Components affected",
        accessor: "componentsAffected",
      },
    ],
    []
  );

  const propData = [
    {
      v2Prop: "small",
      v2Attr: 'small="true"',
      v3Prop: "size=”small”",
      v3Attr: 'size="small"',
      componentsAffected: ["ic-select"],
    },
    {
      v2Prop: "size=”default”",
      v2Attr: 'size="default"',
      v3Prop: "size=”medium”",
      v3Attr: 'size="medium"',
      componentsAffected: ["ic-status-tag", "ic-switch"],
    },
    {
      v2Prop: "groupTitle",
      v2Attr: "group-title",
      v3Prop: "label",
      v3Attr: "label",
      componentsAffected: ["ic-accordion-group", "ic-footer-link-group"],
    },
    {
      v2Prop: "textLabel",
      v2Attr: "text-label",
      v3Prop: "label",
      v3Attr: "label",
      componentsAffected: ["ic-badge"],
    },
    {
      v2Prop: "bodyMaxLines",
      v2Attr: "body-max-lines",
      v3Prop: "maxLines",
      v3Attr: "max-lines",
      componentsAffected: ["ic-empty-state"],
    },
    {
      v2Prop: "theme",
      v2Attr: "theme",
      v3Prop: "brand",
      v3Attr: "brand",
      componentsAffected: ["ic-theme"],
    },
    {
      v2Prop: "stepType",
      v2Attr: "step-type",
      v3Prop: "type",
      v3Attr: "type",
      componentsAffected: ["ic-step"],
    },
    {
      v2Prop: "stepTitle",
      v2Attr: "step-title",
      v3Prop: "heading",
      v3Attr: "heading",
      componentsAffected: ["ic-step"],
    },
    {
      v2Prop: "stepSubtitle",
      v2Attr: "step-subtitle",
      v3Prop: "subheading",
      v3Attr: "subheading",
      componentsAffected: ["ic-step"],
    },
    {
      v2Prop: "stepStatus",
      v2Attr: "step-status",
      v3Prop: "status",
      v3Attr: "status",
      componentsAffected: ["ic-step"],
    },
    {
      v2Prop: "adjacentCount",
      v2Attr: "adjacent-count",
      v3Prop: "adjacentPageCount",
      v3Attr: "adjacentPageCount",
      componentsAffected: ["ic-pagination"],
    },
    {
      v2Prop: "boundaryCount",
      v2Attr: "boundary-count",
      v3Prop: "boundary-page-count",
      v3Attr: "boundaryPageCount",
      componentsAffected: ["ic-pagination"],
    },
    {
      v2Prop: "keyboardShortcut",
      v2Attr: "keyboard-shortcut",
      v3Prop: "keyboardShortcutLabel",
      v3Attr: "keyboard-shortcut-label",
      componentsAffected: ["ic-menu-item"],
    },
    {
      v2Prop: "disableFilter",
      v2Attr: "disable-filter",
      v3Prop: "disableAutoFiltering",
      v3Attr: "disable-auto-filtering",
      componentsAffected: ["ic-search-bar", "ic-select"],
    },
    {
      v2Prop: "maxLength",
      v2Attr: "max-length",
      v3Prop: "maxCharacters",
      v3Attr: "max-characters",
      componentsAffected: ["ic-text-field"],
    },
    {
      v2Prop: "toggleChecked",
      v2Attr: "toggle-checked",
      v3Prop: "checked",
      v3Attr: "checked",
      componentsAffected: ["ic-menu-item", "ic-toggle-button"],
    },
    {
      v2Prop: "hintText",
      v2Attr: "hint-text",
      v3Prop: "assistiveHintText",
      v3Attr: "assistive-hint-text",
      componentsAffected: ["ic-search-bar"],
    },
  ];

  const data = useMemo(
    () =>
      propData.map(
        ({ v2Prop, v2Attr, v3Prop, v3Attr, componentsAffected }) => ({
          v2Prop: (
            <AttributeName
              name={["Property", "Attribute"]}
              value={[v2Prop, v2Attr]}
            />
          ),
          v3Prop: (
            <AttributeName
              name={["Property", "Attribute"]}
              value={[v3Prop, v3Attr]}
            />
          ),
          componentsAffected: (
            <AttributeName
              name={["Web component", "React"]}
              value={[
                componentsAffected.toString(),
                componentsAffected
                  .map((component) => startCase(component))
                  .toString(),
              ]}
            />
          ),
          key: v3Attr,
        })
      ),
    // .sort(
    //   (a, b) => b.description.props.required - a.description.props.required
    // ),
    []
  );
  return (
    <>
      <AttributeTable columns={columns} data={data} />
      <AttributeCards data={data} />
    </>
  );
};

export default MigrationPropTable;
