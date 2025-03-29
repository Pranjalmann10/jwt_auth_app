import { Card, Form, Input, Button, Typography, Flex, Divider, Checkbox, message } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Login = () => {
    const [loading, setLoading] = useState(false);
    
    const handleLogin = async (values) => {
        try {
            setLoading(true);
            // Update port to 5001 to match backend server
            const response = await axios.post('http://localhost:5001/api/auth/login', values);
            // Store token in localStorage or context
            localStorage.setItem('token', response.data.token);
            // Store user data in localStorage for the dashboard
            console.log('User data from login:', response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            message.success('Login successful! Redirecting to dashboard...');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } catch (error) {
            message.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="auth-container">
            <Card className="auth-card">
                <Flex vertical align="center" gap="middle">
                    <Typography.Title level={2} className="auth-title">
                        Welcome Back
                    </Typography.Title>
                    <Typography.Text type="secondary" className="auth-subtitle">
                        Login to access your account
                    </Typography.Text>
                    
                    <Form
                        name="login"
                        layout="vertical"
                        onFinish={handleLogin}
                        autoComplete="off"
                        style={{ width: '100%' }}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { type: 'email', message: 'Please enter a valid email' }
                            ]}
                        >
                            <Input 
                                prefix={<MailOutlined />} 
                                placeholder="Email Address" 
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password' }]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined />} 
                                placeholder="Password" 
                                size="large"
                            />
                        </Form.Item>

                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <Link to="/forgot-password" className="forgot-link">
                                Forgot password?
                            </Link>
                        </Flex>

                        <Form.Item style={{ marginTop: '20px' }}>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large" 
                                block
                                loading={loading}
                            >
                                Login
                            </Button>
                        </Form.Item>
                        
                        <Divider plain>Or Login With</Divider>
                        
                        <Flex gap="middle" justify="center">
                            <Button icon={<GoogleOutlined />} size="large" className="social-button">
                                Google
                            </Button>
                            <Button icon={<FacebookOutlined />} size="large" className="social-button">
                                Facebook
                            </Button>
                        </Flex>
                    </Form>
                    
                    <Typography.Text className="auth-footer">
                        Don't have an account? <Link to="/register">Register</Link>
                    </Typography.Text>
                </Flex>
            </Card>
        </div>
    );
};

export default Login;