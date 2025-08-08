import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Select,
  Slider,
  Rate,
  Tag,
  Avatar,
  Row,
  Col,
  Space,
  Typography,
  Empty
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  VideoCameraOutlined,
  MessageOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  StarFilled
} from "@ant-design/icons";

const { Meta } = Card;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const mentors = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Software Engineer",
    company: "Google",
    expertise: ["Software Engineering", "Machine Learning", "Career Transition"],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 150,
    location: "San Francisco, CA",
    experience: "8+ years",
    languages: ["English", "Mandarin"],
    availability: "Available this week",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Passionate about helping developers transition into big tech companies. Specialized in system design and ML engineering.",
    sessions: 450,
    responseTime: "< 2 hours"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Product Manager",
    company: "Microsoft",
    expertise: ["Product Management", "Strategy", "Leadership"],
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 120,
    location: "Seattle, WA",
    experience: "6+ years",
    languages: ["English", "Spanish"],
    availability: "Available next week",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Former startup founder turned PM at Microsoft. Expert in product strategy and go-to-market planning.",
    sessions: 320,
    responseTime: "< 4 hours"
  }
  // ... other mentors
];

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("All Expertise");
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedRating, setSelectedRating] = useState("Any Rating");
  const [showFilters, setShowFilters] = useState(false);

  const expertiseOptions = [
    "Software Engineering",
    "Product Management",
    "UX Design",
    "Data Science",
    "Digital Marketing",
    "Engineering Leadership",
    "Career Transition",
    "Machine Learning",
    "Strategy",
    "Leadership"
  ];

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some((exp) =>
        exp.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesExpertise =
      selectedExpertise === "All Expertise" ||
      mentor.expertise.includes(selectedExpertise);
    const matchesPrice =
      mentor.hourlyRate >= priceRange[0] && mentor.hourlyRate <= priceRange[1];
    const matchesRating =
      selectedRating === "Any Rating" ||
      mentor.rating >= Number.parseFloat(selectedRating);

    return matchesSearch && matchesExpertise && matchesPrice && matchesRating;
  });

  return (
    <div style={{ padding: 24, background: "#f5f5f5", minHeight: "100vh" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={2} style={{ marginBottom: 0 }}>
            Find Your Perfect Mentor
          </Title>
          <Text type="secondary">
            Connect with industry experts for personalized career guidance
          </Text>
        </Col>
        <Col>
          <Button type="default" icon={<MessageOutlined />}>
            Try AI Assistant
          </Button>
        </Col>
      </Row>

      {/* Search + Filters */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={showFilters ? 24 : 18}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by name, expertise, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={24} md={6}>
          <Button
            icon={<FilterOutlined />}
            onClick={() => setShowFilters(!showFilters)}
            block
          >
            Filters
          </Button>
        </Col>
      </Row>

      {/* Filter Panel */}
      {showFilters && (
        <Card size="small" style={{ marginBottom: 20 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={6}>
              <Text strong>Expertise</Text>
              <Select
                value={selectedExpertise}
                onChange={setSelectedExpertise}
                style={{ width: "100%" }}
              >
                <Option value="All Expertise">All Expertise</Option>
                {expertiseOptions.map((opt) => (
                  <Option key={opt} value={opt}>
                    {opt}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Text strong>
                Price Range: ${priceRange[0]} - ${priceRange[1]}/hour
              </Text>
              <Slider
                range
                min={50}
                max={300}
                step={10}
                value={priceRange}
                onChange={setPriceRange}
              />
            </Col>
            <Col xs={24} md={6}>
              <Text strong>Minimum Rating</Text>
              <Select
                value={selectedRating}
                onChange={setSelectedRating}
                style={{ width: "100%" }}
              >
                <Option value="Any Rating">Any Rating</Option>
                <Option value="4.5">4.5+ Stars</Option>
                <Option value="4.7">4.7+ Stars</Option>
                <Option value="4.8">4.8+ Stars</Option>
                <Option value="4.9">4.9+ Stars</Option>
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Button
                block
                onClick={() => {
                  setSearchTerm("");
                  setSelectedExpertise("All Expertise");
                  setPriceRange([50, 200]);
                  setSelectedRating("Any Rating");
                }}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card>
      )}

      {/* Mentor Cards */}
      <Row gutter={[16, 16]}>
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <Col xs={24} md={12} key={mentor.id}>
              <Card
                hoverable
                cover={<Avatar size={64} src={mentor.image} />}
                actions={[
                  <Button type="primary" href={`/mentor/${mentor.id}`} block>
                    View Profile
                  </Button>,
                  <Button href={`/booking/${mentor.id}`} icon={<VideoCameraOutlined />} />,
                  <Button href={`/chat/${mentor.id}`} icon={<MessageOutlined />} />
                ]}
              >
                <Meta
                  title={
                    <Space direction="vertical" size={0}>
                      <Text strong>{mentor.name}</Text>
                      <Text type="secondary">{mentor.title}</Text>
                      <Text>{mentor.company}</Text>
                    </Space>
                  }
                  description={
                    <>
                      <Space>
                        <Rate
                          disabled
                          allowHalf
                          defaultValue={mentor.rating}
                        />
                        <Text>({mentor.reviewCount})</Text>
                        <Text strong>${mentor.hourlyRate}/hr</Text>
                      </Space>
                      <Paragraph ellipsis={{ rows: 2 }}>
                        {mentor.bio}
                      </Paragraph>
                      <div>
                        {mentor.expertise.slice(0, 3).map((tag, i) => (
                          <Tag key={i}>{tag}</Tag>
                        ))}
                      </div>
                      <Space wrap>
                        <EnvironmentOutlined /> {mentor.location}
                        <ClockCircleOutlined /> {mentor.responseTime}
                        <TeamOutlined /> {mentor.sessions} sessions
                        <Tag>{mentor.availability}</Tag>
                      </Space>
                    </>
                  }
                />
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Empty description="No mentors found" />
          </Col>
        )}
      </Row>
    </div>
  );
}
