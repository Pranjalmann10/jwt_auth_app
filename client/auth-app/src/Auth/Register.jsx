import { Card, Form, Input, Button, Typography, Flex, Divider, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Register = () => {
    const [loading, setLoading] = useState(false);
    
    const handleRegister = async (values) => {
        try {
            setLoading(true);
            // Update endpoint from 'register' to 'signup' to match backend
            const response = await axios.post('http://localhost:5001/api/auth/signup', values);
            message.success('Registration successful! Redirecting to login page...');
            // Redirect to login page after successful registration
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        } catch (error) {
            message.error(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="auth-container">
            <Card className="auth-card">
                <Flex vertical align="center" gap="middle">
                    <Typography.Title level={2} className="auth-title">
                        Create an Account
                    </Typography.Title>
                    <Typography.Text type="secondary" className="auth-subtitle">
                        Join for exclusive access to our platform!
                    </Typography.Text>
                    
                    <Form
                        name="register"
                        layout="vertical"
                        onFinish={handleRegister}
                        autoComplete="off"
                        style={{ width: '100%' }}
                    >
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please enter your full name' }]}
                        >
                            <Input 
                                prefix={<UserOutlined />} 
                                placeholder="Full Name" 
                                size="large"
                            />
                        </Form.Item>

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
                            rules={[
                                { required: true, message: 'Please enter your password' },
                                { min: 6, message: 'Password must be at least 6 characters' }
                            ]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined />} 
                                placeholder="Password" 
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined />} 
                                placeholder="Confirm Password" 
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large" 
                                block
                                loading={loading}
                            >
                                Register
                            </Button>
                        </Form.Item>
                        
                        <Divider plain>Or Register With</Divider>
                        
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
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography.Text>
                </Flex>
            </Card>
        </div>
    );
};

export default Register;