import React, { useState, useMemo } from "react";
import { PencilIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { formatDate } from "../utils/formatDate.js";

export function DataTable({ 
  data, 
  columns, 
  onEdit, 
  onDelete, 
  emptyMessage = "Nenhum registro encontrado.",
  title = "Tabela de Dados",
  itemsPerPage = 5
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular dados paginados
  const paginatedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  // Calcular total de páginas
  const totalPages = useMemo(() => {
    if (!data || data.length === 0) return 0;
    return Math.ceil(data.length / itemsPerPage);
  }, [data, itemsPerPage]);

  // Resetar para primeira página quando os dados mudarem
  React.useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-500 text-center py-4">{emptyMessage}</p>
      </div>
    );
  }

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-yellow-500 to-yellow-600">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item, rowIndex) => (
              <tr key={item.id || rowIndex} className="hover:bg-gray-50 transition-colors duration-150">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex space-x-3">
                    {onEdit && (
                      <button
                        onClick={() => {
                          console.log("=== DataTable onEdit ===");
                          console.log("Item completo:", item);
                          console.log("Item ID:", item.id);
                          console.log("Tipo do ID:", typeof item.id);
                          onEdit(item.id);
                        }}
                        className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-colors duration-200"
                        title="Editar"
                      >
                        <PencilIcon size={18} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
                        title="Excluir"
                      >
                        <TrashIcon size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-700 font-medium">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, data.length)} de {data.length} registros
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Botão Anterior */}
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              <ChevronLeftIcon size={16} />
            </button>

            {/* Números das páginas */}
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentPage === page
                      ? "bg-yellow-500 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Botão Próximo */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 