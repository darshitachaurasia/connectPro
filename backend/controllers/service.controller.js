import httpStatus from "../utils/httpStatus.js";
import ApiError from "../utils/ApiError.js";
import serviceService from "../services/service.service.js";

const createService = async (req, res, next) => {
  try {
    const mentorId = req.user._id;
    const { serviceName, description, duration, price } = req.body;

    const service = await serviceService.createService({
      mentor: mentorId,
      serviceName,
      description,
      duration,
      price,
    });

    res.status(httpStatus.created).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const mentorId = req.user._id;
    const { serviceName, description, duration, price, active } = req.body;

    const updatedService = await serviceService.updateService(
      serviceId,
      mentorId,
      { serviceName, description, duration, price, active }
    );

    if (!updatedService) {
      throw new ApiError(httpStatus.notFound, "Service not found");
    }

    res.status(httpStatus.ok).json({
      success: true,
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    next(error);
  }
};

const getServiceByMentor = async (req, res, next) => {
  try {
    const { mentorId } = req.params;
    const services = await serviceService.getServiceByMentor(mentorId);

    res.status(httpStatus.ok).json({
      success: true,
      services,
    });
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const service = await serviceService.getServiceById(serviceId);

    if (!service) {
      throw new ApiError(httpStatus.notFound, "Service not found");
    }

    res.status(httpStatus.ok).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const mentorId = req.user._id;

    const deleted = await serviceService.deleteService(serviceId, mentorId);

    if (!deleted) {
      throw new ApiError(httpStatus.notFound, "Service not found or not authorized");
    }

    res.status(httpStatus.ok).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createService,
  updateService,
  getServiceByMentor,
  getServiceById,
  deleteService,
};
