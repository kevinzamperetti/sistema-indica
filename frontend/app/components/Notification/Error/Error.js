// eslint-disable-next-line react/prop-types
const Error = ({ closeToast }) => (
    <Media>
        <Media middle left className="mr-3">
            <i className="fa fa-fw fa-2x fa-close"></i>
        </Media>
        <Media body>
            <Media heading tag="h6">
                Erro!
            </Media>
            <p>
                Erro ao salvar dados
            </p>
            <div className="d-flex mt-2">
                <Button color="danger" onClick={() => { closeToast }}>
                    Ok
                </Button>
                <Button color="link" onClick={() => { closeToast }}  className="ml-2 text-danger">
                    Cancelar
                </Button>
            </div>
        </Media>
    </Media>
);

