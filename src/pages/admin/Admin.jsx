import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/hoc/Card';
import { toast } from 'react-toastify';

import AdminCard from './components/AdminCard';

const AdminPage = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/superadmin',
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );

        setAdmins(response.data.users);
      } catch (err) {
        if (!err.response) {
          toast.error('Internal Server Error');
        } else toast.error(err.response.data.message);
      }
    })();
  }, []);
  const approve = async userId => {
    try {
      await axios.post(
        'http://localhost:8000/api/v1/superadmin/approve',
        { userId },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      toast.success('Admin approved successfully');
      setAdmins(admins =>
        admins.map(admin =>
          admin.id === userId ? { ...admin, approved: true } : admin
        )
      );
    } catch (err) {
      if (!err.response) {
        toast.error('Internal Server Error');
      } else toast.error(err.response.data.message);
    }
  };
  return (
    <div style={{ minHeight: '95vh', backgroundColor: '#F0F1F5' }}>
      <div className='pt-4 container'>
        <div className='row'>
          {admins.length === 0 && (
            <h4 className='display-5 text-center'>No Admin Requests</h4>
          )}
          {admins.map(admin => (
            <div key={admin.id} className='col-md-3'>
              <Card
                style={{ backgroundColor: admin.approved ? '#d8f3dc' : '#fff' }}
              >
                <AdminCard admin={admin} approve={approve} />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
