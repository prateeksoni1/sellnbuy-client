import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Card from './Card';

const AddProduct = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();

  const onAdd = async values => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/products',
        values,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      if (res.data.ok) {
        toast.success('Product added successfully');
        history.push('/dashboard');
      }
    } catch (err) {
      if (!err.response) {
        toast.error('Internal Server Error');
      } else toast.error(err.response.data.message);
    }
  };

  return (
    <div style={{ minHeight: '95vh', backgroundColor: '#F0F1F5' }}>
      <div className='pt-5 container' style={{ maxWidth: '30vw' }}>
        <Card>
          <div className='p-4'>
            <h3 className='display-5 mb-4 text-center'>Add Product</h3>
            <form onSubmit={handleSubmit(onAdd)}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  Product Name
                </label>
                <input
                  type='name'
                  className='form-control'
                  id='name'
                  name='name'
                  ref={register({
                    required: true,
                    minLength: 4,
                  })}
                  placeholder="Enter your product's name"
                />
                <p className='text-danger'>
                  {errors.name && 'Invalid Name provided'}
                </p>
              </div>
              <div className='mb-3'>
                <label htmlFor='price' className='form-label'>
                  Price
                </label>
                <input
                  type='number'
                  className='form-control'
                  id='price'
                  name='price'
                  placeholder='Enter the price for your product'
                  ref={register({
                    required: true,
                    min: 1,
                  })}
                />
                <p className='text-danger'>{errors.price && 'Minimum $1'}</p>
              </div>
              <div className='mb-3'>
                <label htmlFor='image' className='form-label'>
                  Image
                </label>
                <input
                  type='name'
                  className='form-control'
                  id='image'
                  name='image'
                  placeholder="Enter your Image's URL"
                  ref={register({
                    required: true,
                    pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/,
                  })}
                />
                <p className='text-danger'>
                  {errors.image && 'Images are required.'}
                </p>
              </div>
              <button
                type='submit'
                className='mt-3 btn btn-primary w-100 btn-lg'
              >
                Add
              </button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default AddProduct;
