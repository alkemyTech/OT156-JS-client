import { Form } from 'react-bootstrap';

const FileUploader = ({ handleImage }) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
                type="file"
                onChange={handleImage}
                name="image"
            />
        </Form.Group>

    );
}

export default FileUploader;