# frozen_string_literal: true
class LikesController < ApplicationController
  # Creates a new Like based on current user and specified kudo
  #
  # Required params:
  #   :kudo_id        [id of kudo]
  def like
    giver_id = current_user.id
    kudo_id = params.require(:kudo_id)

    unless (kudo = Kudo.find_by(id: kudo_id))
      return render json: { errors: "kudo with id #{kudo_id.inspect} could not be found" }, status: :not_found
    end

    if (like = Like.find_by(kudo_id: kudo_id, giver_id: giver_id))
      return render json: { errors: "this like already exists" }, status: :conflict
    end

    like = Like.new(
      kudo_id: kudo_id,
      giver_id: giver_id,
    )

    if like.save
      render json: { like: like }, status: :accepted
    else
      render json: { error: like.errors.messages.values.flatten.to_sentence }, status: :unprocessable_entity
    end
  end

  # Creates a new Like based on current user and specified kudo
  #
  # Required params:
  #   :kudo_id        [id of kudo]
  def unlike
    giver_id = current_user.id
    kudo_id = params.require(:kudo_id)

    unless (kudo = Kudo.find_by(id: kudo_id))
      return render json: { errors: "kudo with id #{kudo_id.inspect} could not be found" }, status: :not_found
    end

    unless (like = Like.find_by(kudo_id: kudo_id, giver_id: giver_id))
      return render json: { errors: "this like doesn't exist" }, status: :conflict
    end

    like.destroy
    
    render json: { deleted: true }, status: :accepted
  end
end
