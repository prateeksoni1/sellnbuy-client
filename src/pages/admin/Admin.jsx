import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/hoc/Card';
import { toast } from 'react-toastify';

import AdminCard from './components/AdminCard';

const AdminPage = () => {
  const [approvedAdmins, setApprovedAdmins] = useState([]);
  const [pendingAdmins, setPendingAdmins] = useState([]);

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

        response.data.users.forEach(user => {
          if (user.approved) {
            setApprovedAdmins(approvedAdmins => [...approvedAdmins, user]);
          } else {
            setPendingAdmins(pendingAdmins => [...pendingAdmins, user]);
          }
        });
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

      const newAdmin = pendingAdmins.find(admin => admin.id === userId);

      setPendingAdmins(pendingAdmins.filter(admin => admin.id !== userId));

      setApprovedAdmins([...approvedAdmins, newAdmin]);
    } catch (err) {
      if (!err.response) {
        toast.error('Internal Server Error');
      } else toast.error(err.response.data.message);
    }
  };

  return (
    <div style={{ minHeight: '95vh', backgroundColor: '#F0F1F5' }}>
      <div className='pt-4 container'>
        <h4 className='display-4 text-center'>Admin Requests</h4>
        <hr />
        <div className='row'>
          <div className='col-6'>
            <h4 className='display-6'>Pending Requests</h4>
            <hr />

            {pendingAdmins.map(admin => (
              <div key={admin.id} className='col-md-3'>
                <Card
                  style={{
                    backgroundColor: '#fff',
                    marginBottom: '2rem',
                    minWidth: 'fit-content',
                  }}
                >
                  <AdminCard admin={admin} approve={approve} />
                </Card>
              </div>
            ))}
          </div>
          <div className='col-md-6'>
            <h4 className='display-6'>Approved Admins</h4>
            <hr />

            {approvedAdmins.map(admin => (
              <div key={admin.id} className='col-md-3'>
                <Card
                  style={{
                    backgroundColor: '#d8f3dc',
                    marginBottom: '2rem',
                    minWidth: 'fit-content',
                  }}
                >
                  <AdminCard admin={admin} />
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
