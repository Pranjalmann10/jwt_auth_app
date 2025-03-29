import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, message, Button, Flex, Spin } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Dashboard.css';

const { Title, Text } = Typography;

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get('http://localhost:5001/api/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            message.error('Failed to fetch user data');
            navigate('/login');
        }
    };

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            message.error('Please login to access the dashboard');
            navigate('/login');
            return;
        }

        // Get user data from localStorage or fetch from server
        const userData = localStorage.getItem('user');
        console.log('User data from localStorage:', userData);
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                console.log('Parsed user data:', parsedUser);
                setUser(parsedUser);
                setLoading(false);
            } catch (error) {
                console.error('Error parsing user data:', error);
                fetchUserData(token);
            }
        } else {
            // Alternatively, fetch user data from server using the token
            fetchUserData(token);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        message.success('Logged out successfully');
        navigate('/login');
    };

    if (loading) {
        return <div className="loading"><Spin size="large" /> Loading...</div>;
    }

    return (
        <div className="simple-dashboard">
            <Card className="profile-card">
                <Flex justify="space-between" align="center">
                    <Title level={2}>Dashboard</Title>
                    <Button 
                        type="primary" 
                        danger 
                        icon={<LogoutOutlined />} 
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Flex>
                
                <div className="profile-content">
                    <Title level={3}>Welcome, {user?.name || 'User'}</Title>
                    <Text className="profile-text">You are logged in as: <strong>{user?.name || 'User'}</strong></Text>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;