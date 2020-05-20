import React from 'react';
import { Link } from 'react-router-dom';

export default class Util extends React.Component {

    optionsMUIDataTable = {
        filterType: "dropdown",
        responsive: 'stacked',
        selectableRows: "none",
        download: false,
        viewColumns: false,
        textLabels: {
            body: {
              noMatch: "Nenhum registro encontrado",
              toolTip: "Ordernar",
              columnHeaderTooltip: column => `Ordernar por ${column.label}`
            },
            pagination: {
              next: "Próxima página",
              previous: "Página anterior",
              rowsPerPage: "Linhas por página:",
              displayRows: "do",
            },
            toolbar: {
              search: "Procurar",
              downloadCsv: "Download CSV",
              print: "Imprimir",
              viewColumns: "Exibir Colunas",
              filterTable: "Tabela de Filtro",
            },
            filter: {
              all: "Todos",
              title: "FILTROS",
              reset: "REDEFINIR",
            },
            viewColumns: {
              title: "Mostrar Colunas",
              titleAria: "Mostrar/Ocultar Colunas da Tabela",
            },
            selectedRows: {
              text: "linha(s) selecionada(s)",
              delete: "Excluir",
              deleteAria: "Excluir linhas selecionadas",
            },
          }
    };

    optionsMUIDataTableWithOutPrintAndFilter = {
        filterType: "dropdown",
        responsive: 'stacked',
        selectableRows: "none",
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        textLabels: {
            body: {
              noMatch: "Nenhum registro encontrado",
              toolTip: "Ordernar",
              columnHeaderTooltip: column => `Ordernar por ${column.label}`
            },
            pagination: {
              next: "Próxima página",
              previous: "Página anterior",
              rowsPerPage: "Linhas por página:",
              displayRows: "do",
            },
            toolbar: {
              search: "Procurar",
              downloadCsv: "Download CSV",
              print: "Imprimir",
              viewColumns: "Exibir Colunas",
              filterTable: "Tabela de Filtro",
            },
            filter: {
              all: "Todos",
              title: "FILTROS",
              reset: "REDEFINIR",
            },
            viewColumns: {
              title: "Mostrar Colunas",
              titleAria: "Mostrar/Ocultar Colunas da Tabela",
            },
            selectedRows: {
              text: "linha(s) selecionada(s)",
              delete: "Excluir",
              deleteAria: "Excluir linhas selecionadas",
            },
          }
    };

    optionsMUIDataTableForHistory = {
        filterType: "dropdown",
        responsive: 'stacked',
        selectableRows: "none",
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        pagination: false,
        selectableRowsOnClick: false,
        search: false,
        sort: false,
        textLabels: {
            body: {
              noMatch: "Nenhum registro encontrado",
              toolTip: "Ordernar",
              columnHeaderTooltip: column => `Ordernar por ${column.label}`
            },
            pagination: {
              next: "Próxima página",
              previous: "Página anterior",
              rowsPerPage: "Linhas por página:",
              displayRows: "do",
            },
            toolbar: {
              search: "Procurar",
              downloadCsv: "Download CSV",
              print: "Imprimir",
              viewColumns: "Exibir Colunas",
              filterTable: "Tabela de Filtro",
            },
            filter: {
              all: "Todos",
              title: "FILTROS",
              reset: "REDEFINIR",
            },
            viewColumns: {
              title: "Mostrar Colunas",
              titleAria: "Mostrar/Ocultar Colunas da Tabela",
            },
            selectedRows: {
              text: "linha(s) selecionada(s)",
              delete: "Excluir",
              deleteAria: "Excluir linhas selecionadas",
            },
          }
    };

	logout() {
		localStorage.removeItem('Authorization')
		localStorage.removeItem('Email')
		localStorage.removeItem('Name')
		localStorage.removeItem('Profile')
		localStorage.removeItem('SectorCompany')
  }
  
  goPreviousPage() {
    history.go(-1);
  }
	
	setIndicationStatusColor(status) {
    if (status === 'FINISHED') {
        return "secondary"
    } else if (status === 'IN_PROGRESS') {
        return "primary"
    } else if (status === 'NEW') {
        return "warning"
      } else if (status === 'HIRED') {
        return "success"
      } else if (status === 'DISCARDED') {
        return "danger"
    }
  }

  setIndicationStatusName(status) {
    if (status === 'FINISHED') {
        return "Finalizada"
    } else if (status === 'IN_PROGRESS') {
        return "Em andamento"
    } else if (status === 'NEW') {
        return "Nova"
    } else if (status === 'HIRED') {
        return "Contratada"
    } else if (status === 'DISCARDED') {
        return "Descartada"
    }
  }

	setCandidatureStatusColor(status) {
    if (status === 'FINISHED') {
        return "secondary"
    } else if (status === 'IN_PROGRESS') {
        return "primary"
    } else if (status === 'NEW') {
        return "warning"
    } else if (status === 'HIRED') {
        return "success"
    } else if (status === 'DISCARDED') {
        return "danger"
    }
  }

  setCandidatureStatusName(status) {
    if (status === 'FINISHED') {
        return "Finalizada"
    } else if (status === 'IN_PROGRESS') {
        return "Em andamento"
    } else if (status === 'NEW') {
        return "Nova"
    } else if (status === 'HIRED') {
        return "Contratada"
    } else if (status === 'DISCARDED') {
        return "Descartada"
    }
  }

  setEnabledColor(enabled) {
    if (enabled === true) {
        return "success"
    } else {
        return "secondary"
    }
  }

  setEnabledName(enabled) {
    if (enabled === true) {
        return "Ativo"
    } else {
        return "Inativo"
    }
  }

  setKeyWordFoundColor(found) {
    if (found === true) {
        return "success"
    } else {
        return "secondary"
    }
  }

  setKeyWordFoundName(found) {
    if (found === true) {
        return "Sim"
    } else {
        return "Não"
    }
  }

	render() {
		return (
			<React.Fragment>
				{ this.logout.bind( this ) }
				<Link to="/pages/login" className="ml-auto text-decoration-none"/>
			</React.Fragment>
		)
	}
}

