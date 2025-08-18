import { useState } from "react";
import { Link } from "react-router-dom";
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

import { useEffect } from "react";
import mentorApi from "../../apiManager/mentor";
import useMentorStore from "../../redux/mentors";

export default function MentorsPage() {
  const mentors = useMentorStore((state) => state.mentorsData);
  const setMentorsData = useMentorStore((state) => state.setMentorsData);
  const [allMentors, setAllMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("All Expertise");
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedRating, setSelectedRating] = useState("Any Rating");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchMentors = async () => {
      const filters = {
        fullname: searchTerm,
        expertise: selectedExpertise === "All Expertise" ? "" : selectedExpertise,
        rating: selectedRating === "Any Rating" ? "" : selectedRating,
      };

      if (priceRange[0] !== 50 || priceRange[1] !== 200) {
        filters.priceRange = priceRange.join("-");
      }
      
      const response = await mentorApi.getAllMentors(filters);
      if (searchTerm === "" && selectedExpertise === "All Expertise" && selectedRating === "Any Rating" && (priceRange[0] === 50 && priceRange[1] === 200)) {
        setAllMentors(response.data.mentors);
      }
      setMentorsData(response.data.mentors);
    };
    fetchMentors();
  }, [searchTerm, selectedExpertise, selectedRating, priceRange]);

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

  const filteredMentors = mentors;

  console.log(mentors, filteredMentors, allMentors);
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
      <Row gutter={[8, 8]}>
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <Col xs={24} md={6} key={mentor._id}>
              <Card
                hoverable
                cover={<Avatar size={32} src={mentor.image} />}
                actions={[
  <Link to={`/mentor/${mentor._id}`} key="view">
    <Button type="primary" block>
      View Profile
    </Button>
  </Link>,

  <Link to={`/booking-page/${mentor._id}`} key="book">
    <Button icon={<VideoCameraOutlined />} />
  </Link>,
 <Link to={`/chat/${mentor._id}`}>
  <Button icon={<MessageOutlined />} />
</Link>

]}

              >
                <Meta
                  title={
                    <Space direction="vertical" size={0}>
                      <Text strong>{mentor.fullname}</Text>
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
                        {mentor.services && mentor.services.slice(0, 3).map((service, i) => (
                          <Tag key={i}>{service.name}</Tag>
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
