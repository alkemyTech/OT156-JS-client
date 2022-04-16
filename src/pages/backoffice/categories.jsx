import './news.css'
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import GetAllCategories from '../../services/getAllCategories';

const CategoriesBackOffice = () => {
    const { categories } = GetAllCategories();
    return (
        <div className="tableContainer">
            <div className="backButton">
                <div>
                    <Link to='/backoffice'>🏠 Backoffice</Link>
                </div>
            </div>
            <h3>Categorias</h3>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map(category => {
                            return (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default CategoriesBackOffice;