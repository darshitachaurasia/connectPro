'use client'

import { useState, useEffect, useRef } from 'react'
import { Layout, Card, Input, Button, Avatar, Typography, Space, Tag, Row, Col, Spin } from 'antd'
import { ArrowLeftOutlined, RobotOutlined, UserOutlined, SendOutlined, BulbOutlined, RiseOutlined, TeamOutlined } from '@ant-design/icons'
import Link from 'next/link'

// AntD Components
const { Header, Content } = Layout
const { Title, Paragraph, Text } = Typography

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  suggestions?: string[]
}

const quickPrompts = [
  'Tell me about software engineering career path',
  'What skills do I need for product management?',
  'How to transition into data science?',
  "What's the job market like for UX designers?",
  'Salary expectations for marketing roles',
  'Best programming languages to learn in 2024',
]

export default function CareerChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hello! I'm your AI career advisor. I can help you explore career paths, understand job requirements, discuss salary expectations, and provide personalized guidance. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: ['Explore career options', 'Salary information', 'Skill requirements', 'Industry trends'],
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle Send
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Fetch AI response using LangChain API
    const aiResponse = await fetchLangChainResponse(content)

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: aiResponse.content,
      sender: 'ai',
      timestamp: new Date(),
      suggestions: aiResponse.suggestions,
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsTyping(false)
  }

  // LangChain API Integration
  const fetchLangChainResponse = async (query: string) => {
    try {
      const response = await fetch('/api/langchain-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('LangChain Error:', error)
      return {
        content:
          'Oops! Something went wrong. Please try again later.',
        suggestions: ['Retry', 'Check another topic'],
      }
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      {/* Header */}
      <Header style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Link href="/career-suggestions">
            <Button type="link" icon={<ArrowLeftOutlined />} style={{ fontSize: 16 }}>
              Back
            </Button>
          </Link>
          <Space>
            <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#1890ff' }} />
            <div>
              <Title level={5} style={{ margin: 0 }}>AI Career Advisor</Title>
              <Text type="secondary" style={{ fontSize: 12 }}>Online • Ready to help</Text>
            </div>
          </Space>
        </Space>
        <Button type="primary" href="/mentors">Find Human Mentors</Button>
      </Header>

      <Content style={{ maxWidth: 1000, margin: '0 auto', padding: '24px' }}>
        {/* Quick Prompts */}
        <Card style={{ marginBottom: 24 }}>
          <Title level={5}>Quick Questions:</Title>
          <Space wrap>
            {quickPrompts.map((prompt, index) => (
              <Tag
                key={index}
                color="blue"
                style={{ cursor: 'pointer' }}
                onClick={() => handleQuickPrompt(prompt)}
              >
                {prompt}
              </Tag>
            ))}
          </Space>
        </Card>

        {/* Chat Messages */}
        <Card style={{ height: '60vh', overflowY: 'auto', marginBottom: 16, borderRadius: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((message) => (
              <div key={message.id} style={{ display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <Space align="start">
                  {message.sender === 'ai' && <Avatar icon={<RobotOutlined />} />}
                  <div
                    style={{
                      background: message.sender === 'user' ? '#1890ff' : '#f0f0f0',
                      color: message.sender === 'user' ? '#fff' : '#000',
                      padding: '12px 16px',
                      borderRadius: 8,
                      maxWidth: '70%',
                    }}
                  >
                    <Paragraph style={{ marginBottom: 8, whiteSpace: 'pre-line' }}>{message.content}</Paragraph>
                    {message.suggestions && (
                      <Space wrap>
                        {message.suggestions.map((s, i) => (
                          <Button key={i} size="small" onClick={() => handleSendMessage(s)}>
                            {s}
                          </Button>
                        ))}
                      </Space>
                    )}
                    <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4 }}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {message.sender === 'user' && <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />}
                </Space>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Space align="start">
                  <Avatar icon={<RobotOutlined />} />
                  <div style={{ background: '#f0f0f0', padding: '12px 16px', borderRadius: 8 }}>
                    <Spin size="small" /> <Text type="secondary" style={{ marginLeft: 8 }}>AI is thinking...</Text>
                  </div>
                </Space>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Input */}
        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about careers, skills, salaries, or job market trends..."
            onPressEnter={() => handleSendMessage(inputValue)}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
          />
        </Space.Compact>

        {/* Features */}
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ textAlign: 'center', background: '#fafafa' }}>
              <BulbOutlined style={{ fontSize: 32, color: '#1890ff' }} />
              <Title level={5}>Career Guidance</Title>
              <Text type="secondary">Get personalized advice on career paths and transitions</Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ textAlign: 'center', background: '#fafafa' }}>
              <RiseOutlined style={{ fontSize: 32, color: '#1890ff' }} />
              <Title level={5}>Market Insights</Title>
              <Text type="secondary">Stay updated with latest industry trends and demands</Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ textAlign: 'center', background: '#fafafa' }}>
              <TeamOutlined style={{ fontSize: 32, color: '#1890ff' }} />
              <Title level={5}>Skill Development</Title>
              <Text type="secondary">Learn what skills you need for your target role</Text>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
