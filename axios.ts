import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-medics.vercel.app/",
});

const getEspecialidades = async () => {
  const { data } = await axiosInstance.get("api/especialidades/");

  return data;
};

const getGeneros = async () => {
  const { data } = await axiosInstance.get("api/generos/");

  return data;
}

const getCategorias = async () => {
  const { data } = await axiosInstance.get("api/categorias/");

  return data;
};

const getMedicos = async (token: string) => {
  const { data } = await axiosInstance.get("api/medicos/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return data;
};

const getExamenes = async (token: string) => {
  const { data } = await axiosInstance.get("api/examenes/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return data;
};

const getMedico = async (id: string, token: string) => {
  const { data: response } = await axios
    .create({
      baseURL: "https://backend-medics.vercel.app/",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .get(`api/medicos/${id}`);

  return response;
};

const addMedico = async (data: any, token: string | null) => {
  const { data: response } = await axios
    .create({
      baseURL: "https://backend-medics.vercel.app/",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .post("api/medicos/", data);

  return response;
};

const updateMedico = async (props: {
  data: any;
  token: string;
  id: string;
}) => {
  const response = await axios
    .create({
      baseURL: "https://backend-medics.vercel.app/",
      headers: {
        Authorization: `Token ${props.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .patch(`api/medicos/${props.id}/`, props.data);

  return response;
};

const getExamen = async (id: string, token: string) => {
  const { data: response } = await axios
    .create({
      baseURL: "https://backend-medics.vercel.app/",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .get(`api/examenes/${id}`);

  return response;
};

const addExamen = async (data: any, token: string) => {
  const { data: response } = await axios
    .create({
      baseURL: "https://backend-medics.vercel.app/",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .post("api/examenes/", data);

  return response;
};

const deleteExamen = async (id: string, token: string) => {
  const { data: response } = await axios
    .create({
      baseURL: "https://backend-medics.vercel.app/",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .delete(`api/examenes/${id}/`);

  return response;
};

const deleteMedico = async (id: string, token: string) => {
  console.log(id, token);
  const { data: response } = await axios
    .create({
      baseURL: "https://backend-medics.vercel.app/",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .delete(`api/medicos/` + id + "/");

  console.log(response);

  return response;
};

const updateExamen = async (id: string, data: any, token: string) => {
  const { data: response } = await axios
    .create({
      baseURL: "https://backend-medics.vercel.app/",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .patch(`api/examenes/${id}/`, data);

  return response;
};

const registerRequest = async (data: any) => {
  const { data: response } = await axios
    .create({
      baseURL: "https://backend-medics.vercel.app/",
    })
    .post("auth/register/", data);

  return response;
};

const updateUser = async (id: string, data: any, token: string) => {
  const { data: response } = await axios
    .create({
      baseURL: "https://backend-medics.vercel.app/",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .patch(`api/profile/${id}/`, data);

  return response;
};

const loginRequest = async (username: string, password: string) => {
  const request = await axios
    .create({
      baseURL: "https://backend-medics.vercel.app/",
    })
    .post(
      "auth/login/",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

  return await request;
};

export {
  getEspecialidades,
  registerRequest,
  loginRequest,
  getMedicos,
  getExamenes,
  addMedico,
  addExamen,
  getCategorias,
  updateMedico,
  updateExamen,
  getExamen,
  getMedico,
  axiosInstance,
  deleteExamen,
  deleteMedico,
  updateUser,
  getGeneros
};
