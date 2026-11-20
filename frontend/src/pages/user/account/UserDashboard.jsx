'use client'

import { Card, Row, Col, Typography } from 'antd'
import { Brain, MessageCircle, Calendar } from 'lucide-react'

const { Title, Paragraph } = Typography

export default function UserDashboard() {
  return (
    <section id="how-it-works" style={{ padding: '80px 0', background: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <Title level={2} style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>
            Make Your Career Journey Simple
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#595959', maxWidth: '640px', margin: '0 auto' }}>
            Our AI-powered platform makes career guidance simple and effective
          </Paragraph>
        </div>

        {/* Cards */}
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={8}>
            <Card
              hoverable
              bordered
              style={{ textAlign: 'center', borderRadius: '12px' }}
              bodyStyle={{ padding: '24px' }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 16px',
                  borderRadius: '50%',
                  backgroundColor: '#1677ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Brain size={32} color="#fff" />
              </div>
              <Title level={4} style={{ fontSize: '20px', marginBottom: '12px' }}>
                1. Take AI Career Quiz
              </Title>
              <Paragraph style={{ fontSize: '16px', color: '#595959' }}>
                Complete our comprehensive assessment powered by advanced AI to discover your strengths,
                interests, and ideal career paths.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              hoverable
              bordered
              style={{ textAlign: 'center', borderRadius: '12px' }}
              bodyStyle={{ padding: '24px' }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 16px',
                  borderRadius: '50%',
                  backgroundColor: '#1677ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MessageCircle size={32} color="#fff" />
              </div>
              <Title level={4} style={{ fontSize: '20px', marginBottom: '12px' }}>
                2. Get AI Suggestions
              </Title>
              <Paragraph style={{ fontSize: '16px', color: '#595959' }}>
                Receive personalized career recommendations with detailed insights, salary expectations, and
                growth potential.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              hoverable
              bordered
              style={{ textAlign: 'center', borderRadius: '12px' }}
              bodyStyle={{ padding: '24px' }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 16px',
                  borderRadius: '50%',
                  backgroundColor: '#1677ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Calendar size={32} color="#fff" />
              </div>
              <Title level={4} style={{ fontSize: '20px', marginBottom: '12px' }}>
                3. Book Expert Mentor
              </Title>
              <Paragraph style={{ fontSize: '16px', color: '#595959' }}>
                Connect with verified industry experts for personalized guidance, mock interviews, and career
                coaching sessions.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  )
}
