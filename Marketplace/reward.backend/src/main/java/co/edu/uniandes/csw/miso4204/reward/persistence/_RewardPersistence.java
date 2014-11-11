/* ========================================================================
 * Copyright 2014 miso4204
 *
 * Licensed under the MIT, The MIT License (MIT)
 * Copyright (c) 2014 miso4204

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 * ========================================================================


Source generated by CrudMaker version 1.0.0.qualifier

*/

package co.edu.uniandes.csw.miso4204.reward.persistence;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import co.edu.uniandes.csw.miso4204.reward.logic.dto.RewardDTO;
import co.edu.uniandes.csw.miso4204.reward.logic.dto.RewardPageDTO;
import co.edu.uniandes.csw.miso4204.reward.persistence.converter.RewardConverter;
import co.edu.uniandes.csw.miso4204.reward.persistence.entity.RewardEntity;

public abstract class _RewardPersistence{

  	protected EntityManager entityManager;
	
	public RewardDTO createReward(RewardDTO reward) {
		RewardEntity entity=RewardConverter.persistenceDTO2Entity(reward);
		entityManager.getTransaction().begin();
		entityManager.persist(entity);
		entityManager.getTransaction().commit();
		return RewardConverter.entity2PersistenceDTO(entity);
	}
	
	@SuppressWarnings("unchecked")
	public List<RewardDTO> getRewards() {
		entityManager.getTransaction().begin();
		Query q = entityManager.createQuery("select u from RewardEntity u");
		List<RewardDTO> result = RewardConverter.entity2PersistenceDTOList(q.getResultList());
		entityManager.getTransaction().commit();
		return result;
		
	}

	@SuppressWarnings("unchecked")
	public RewardPageDTO getRewards(Integer page, Integer maxRecords) {
		entityManager.getTransaction().begin();
		Query count = entityManager.createQuery("select count(u) from RewardEntity u");
		Long regCount = 0L;
		regCount = Long.parseLong(count.getSingleResult().toString());
		Query q = entityManager.createQuery("select u from RewardEntity u");
		if (page != null && maxRecords != null) {
		    q.setFirstResult((page-1)*maxRecords);
		    q.setMaxResults(maxRecords);
		}
		RewardPageDTO response = new RewardPageDTO();
		response.setTotalRecords(regCount);
		response.setRecords(RewardConverter.entity2PersistenceDTOList(q.getResultList()));
		entityManager.getTransaction().commit();
		return response;
	}

	public RewardDTO getReward(Long id) {
		entityManager.getTransaction().begin();
		RewardDTO result = RewardConverter.entity2PersistenceDTO(entityManager.find(RewardEntity.class, id));
		entityManager.getTransaction().commit();
		return result;
	}

	public void deleteReward(Long id) {
		entityManager.getTransaction().begin();
		RewardEntity entity=entityManager.find(RewardEntity.class, id);
		entityManager.remove(entity);
		entityManager.getTransaction().commit();
	}

	public void updateReward(RewardDTO detail) {
		entityManager.getTransaction().begin();
		RewardEntity entity=entityManager.merge(RewardConverter.persistenceDTO2Entity(detail));
		RewardConverter.entity2PersistenceDTO(entity);
		entityManager.getTransaction().commit();
	}

}