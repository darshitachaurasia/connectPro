import React, { useEffect, useState } from "react";
import { Table, Button, Spin } from "antd";
import moment from "moment";
import booking from "../../apiManager/booking";
import MentorDashboard from "./MentorDashboard";

const MentorBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await booking.getMentorBookings();
      setBookings(res?.data?.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((b) =>
    activeTab === "upcoming"
      ? moment(b.dateAndTime).isAfter(moment())
      : moment(b.dateAndTime).isBefore(moment())
  );

  const columns = [
    {
      title: "Date",
      dataIndex: "dateAndTime",
      key: "date",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Time",
      dataIndex: "dateAndTime",
      key: "time",
      render: (text) => moment(text).format("hh:mm A"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
  ];

  return (
    
      <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Your Bookings
        </h2>

        <div className="flex gap-4 mb-6">
          <Button
            type={activeTab === "upcoming" ? "primary" : "default"}
            onClick={() => setActiveTab("upcoming")}
            style={{
              backgroundColor:
                activeTab === "upcoming" ? "#1890ff" : "#f0f0f0",
              color: activeTab === "upcoming" ? "#fff" : "#000",
            }}
          >
            Upcoming Bookings
          </Button>
          <Button
            type={activeTab === "past" ? "primary" : "default"}
            onClick={() => setActiveTab("past")}
            style={{
              backgroundColor: activeTab === "past" ? "#1890ff" : "#f0f0f0",
              color: activeTab === "past" ? "#fff" : "#000",
            }}
          >
            Past Bookings
          </Button>
        </div>

        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredBookings}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 5 }}
          />
        </Spin>
      </div>
 
  );
};

export default MentorBookings;
