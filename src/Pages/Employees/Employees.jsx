import DataGrid from "@/Components/DataGrid/CustomDataGrid";
import { dataGridRefs } from "@/Components/DataGrid/DataGridRenderElements/dataGridRefs";

function Employees() {

    // Pour rendre ce letit composant autonome : 
    // todo : récuperer le CSS correspondant aux boxes de la recherche, ou sinon la rajouter directement dans le composant (dans xlsfilter of course)
    // todo 2 : rajouter / récupérer le css également pour les boutons, pour l'instant il n'y a rien :D
    // todo 3 : récuperer les icons spécifiques pour le datagrid et l'utiliser en "interne dans le composant"

    // todo 4 : questionnement : est ce qu'on fait le ménage dans les elements du datagrid ou est ce que je les laisse pour les exemples de ce que l'on peux faire ? 
    // todo 5 : faudrait également rajouter la pagination directement dans l'élément pour plus que ce soit dépendant d'un truc externe, c'est un peu relou ou pas ? 
    // => ptet qu'au final pas tant que ça dans la  mesure ou on appelle juste <Pagination /> et le hook correspondant, le reste devrait suivre =]

    const rows = [
        {
            element: "one",
            secelem: 10
        },
        {
            element: "two",
            secelem: 30,
        },
        {
            element: "three",
            secelem: 50,
        }
    ]

    const dataGridColumns = [
        {
            key: "element", name: "Element"
        },
        {
            key: "secelem", name: "Number"
        }
    ]

    const dispatchType = "EmployeeTestDispatch"

    return (

        <>
            <DataGrid
                rows={rows}
                dataGridColumns={dataGridColumns}
                dispatchType={dispatchType}
                hvMin="h-full"
            />
        </>
    );
}

export default Employees;