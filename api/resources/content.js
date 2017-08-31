import contentRepository from '../repositories/content-repository';

export default function(app) {
  app.get('/content', (request, response) => {
    const pagination = {
      limit: request.query.limit,
      offset: request.query.offset
    };
    contentRepository.find(request.query, pagination)
      .then((data) => {
        response.status(200).json(data);
      });
  });
}
