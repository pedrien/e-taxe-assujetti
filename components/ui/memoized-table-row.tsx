import React from 'react';

interface MemoizedTableRowProps {
  item: unknown;
  index: number;
  renderCheckbox: (tabKey: string, itemId: string) => React.ReactNode;
  tabKey: string;
  columns: Array<{
    key: string;
    label: string;
    render?: (item: unknown) => React.ReactNode;
  }>;
}

export const MemoizedTableRow = React.memo<MemoizedTableRowProps>(({
  item,
  index,
  renderCheckbox,
  tabKey,
  columns,
}) => {
  const itemData = item as Record<string, unknown>;
  return (
    <tr key={String(itemData.id) || index}>
      <td>{renderCheckbox(tabKey, String(itemData.id))}</td>
      {columns.map((column) => (
        <td key={column.key}>
          {column.render ? column.render(item) : String(itemData[column.key] || '')}
        </td>
      ))}
    </tr>
  );
}, (prevProps, nextProps) => {
  // Comparaison personnalisée pour éviter les re-renders inutiles
  const prevItem = prevProps.item as Record<string, unknown>;
  const nextItem = nextProps.item as Record<string, unknown>;
  return (
    prevItem.id === nextItem.id &&
    prevProps.tabKey === nextProps.tabKey &&
    JSON.stringify(prevItem) === JSON.stringify(nextItem)
  );
});

MemoizedTableRow.displayName = 'MemoizedTableRow';
